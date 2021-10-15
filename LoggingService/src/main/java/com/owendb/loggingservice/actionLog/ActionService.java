package com.owendb.loggingservice.actionLog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ActionService {

    private final ActionLogRepository actionLogRepository;

    @Autowired
    public ActionService(ActionLogRepository actionLogRepository) {
        this.actionLogRepository = actionLogRepository;
    }

    public void createLog(ActionLog log) {
        actionLogRepository.save(log);
    }

    public Boolean deleteLog(Integer id) {
        boolean exists = actionLogRepository.existsById(id);
        if(!exists) {
            throw new IllegalStateException("BotActionLog with id " + id + " does not exist!");
        }
        actionLogRepository.deleteById(id);
        return true;
    }

    public Boolean deleteLogsByUserId(Long userId) {
        Iterable<ActionLog> logs = actionLogRepository.findActionsByUserId(userId);
        if (logs != null) {
            actionLogRepository.deleteAllInBatch(logs);
            return true;
        }
        return false;
    }

    public List<ActionLog> getLogsByCategory(String category) {
        List<ActionLog> logs = actionLogRepository.findActionsByCategory(category);
        return logs;
    }

    public List<ActionLog> getLogsByUserId(Long userId) {
        List<ActionLog> logs = actionLogRepository.findActionsByUserId(userId);
        return logs;
    }
}
