package com.owendb.loggingservice.actionLog;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActionLogRepository extends JpaRepository<ActionLog, Integer> {
    List<ActionLog> findActionsByCategory(String category);
    List<ActionLog> findActionsByUserId(Long userId);
}
