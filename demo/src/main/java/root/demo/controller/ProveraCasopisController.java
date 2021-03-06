package root.demo.controller;

import java.util.HashMap;
import java.util.List;

import org.camunda.bpm.engine.FormService;
import org.camunda.bpm.engine.IdentityService;
import org.camunda.bpm.engine.RepositoryService;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.TaskService;
import org.camunda.bpm.engine.form.FormField;
import org.camunda.bpm.engine.form.TaskFormData;
import org.camunda.bpm.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import root.demo.model.FormFieldsDto;
import root.demo.model.FormSubmissonDTO;
import root.demo.services.ValidacijaNOService;


@Controller
@RequestMapping("/aktivacijaCasopis")
public class ProveraCasopisController {
	
	@Autowired
	IdentityService identityService;
	
	@Autowired
	private RuntimeService runtimeService;
	
	@Autowired
	private RepositoryService repositoryService;
	
	@Autowired
	TaskService taskService;
	
	@Autowired
	FormService formService;
	
	@Autowired
	ValidacijaNOService validacijaNOService ;

	// proces je zapocet, sad samo treba da se claim-uje novi task
	@GetMapping(path = "/noviAktivan/{id}", produces = "application/json")
    public @ResponseBody FormFieldsDto noviAktivan(@PathVariable String id) {
		
		Task task = taskService.createTaskQuery().processInstanceId(id).list().get(0);
		
		// imam task, treba mi forma
		TaskFormData tfd = formService.getTaskFormData(task.getId());
		
		List<FormField> properties = tfd.getFormFields();
		// dobijem listu field-ova, samo treba da ih prikazem
		
        return new FormFieldsDto(task.getId(), id, properties);        
    }
	
	@PostMapping(path = "/posaljiAktivan/{taskId}", produces = "application/json")
    public @ResponseBody ResponseEntity posaljiAktivan(@RequestBody List<FormSubmissonDTO> dto, @PathVariable String taskId) {
		HashMap<String, Object> map = this.mapListToDto(dto);	
				
		// singleResult jer moze da vrati null ili samo jedan task
		Task task = taskService.createTaskQuery().taskId(taskId).singleResult();
		
		String processInstanceId = task.getProcessInstanceId();
		
		// postavim procesnu varijablu na bas tu instancu 
		// naucnaOblast je ime varijable, a dto je onaj koji je korisnik uneo
		runtimeService.setVariable(processInstanceId, "casopisAktivan", dto);
		
		formService.submitTaskForm(taskId, map);
		
		return new ResponseEntity<>(HttpStatus.OK);
		
		
		
    }
	// rezultat ovoga -> poslata forma za dodavanje nove naucne oblasti (zavrsen user task)
	
	private HashMap<String, Object> mapListToDto(List<FormSubmissonDTO> list)
	{
		HashMap<String, Object> map = new HashMap<String, Object>();
		for(FormSubmissonDTO temp : list){
			map.put(temp.getFieldId(), temp.getFieldValue());
		}
		
		return map;
	}


}
