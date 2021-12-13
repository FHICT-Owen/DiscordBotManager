package com.owendb.loggingservice.actionLog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("api/log")
public class ActionLogController {
    private final ActionService actionService;

    @Autowired
    public ActionLogController(ActionService actionService) {
        this.actionService = actionService;
    }

    @GetMapping
    public List<ActionLog> getLogs() { return actionService.getLogs(); }

    @GetMapping("/category/{categoryName}")
    public List<ActionLog> getLogsByCategory(@PathVariable("categoryName") String categoryName) {
        return actionService.getLogsByCategory(categoryName);
    }

    @GetMapping("/user/{userId}")
    public List<ActionLog> getLogsByUserId(@PathVariable("userId") Long userId) {
        return actionService.getLogsByUserId(userId);
    }

    @PostMapping
    public ResponseEntity<ActionLog> addActionLog(@RequestBody ActionLog actionLog) {
        ActionLog checkLog = new ActionLog (actionLog);
        actionService.createLog(checkLog);
        return new ResponseEntity<>(actionLog, HttpStatus.CREATED);
    }

    @DeleteMapping("/{logId}")
    public void deleteActionLog(@PathVariable("logId") Integer logId) {
        actionService.deleteLog(logId);
    }

    @DeleteMapping("/user/{userId}")
    public void deleteLogsByUserId(@PathVariable("userId") Long userId) {
        actionService.deleteLogsByUserId(userId);
    }
}
