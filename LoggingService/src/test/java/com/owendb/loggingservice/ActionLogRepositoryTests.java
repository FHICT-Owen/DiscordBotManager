package com.owendb.loggingservice;

import com.owendb.loggingservice.actionLog.ActionLog;
import com.owendb.loggingservice.actionLog.ActionLogRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class ActionLogRepositoryTests {

    @Autowired
    private ActionLogRepository repository;

    @AfterEach
    void tearDown() { repository.deleteAll(); }

    @Test
    void itShouldFindLogByCategory() {
        //given
        String category = "userManagement";
        //when
        var expected = repository.findActionsByCategory(category);
        //then
        assertThat(expected).isEmpty();
    }

    @Test
    void itShouldNotFindLogByCategory() {
        //given
        ActionLog actionLog = new ActionLog(190833902020067329L, LocalTime.now() , LocalDate.now(),"userManagement", "Banned user");
        repository.save(actionLog);
        String category = "userManagement";
        //when
        var expected = repository.findActionsByCategory(category);
        //then
        assertThat(expected).isNotEmpty();
    }

    @Test
    void itShouldFindLogByUserId() {
        //given
        Long userId = 190833902020067329L;
        //when
        var expected = repository.findActionsByUserId(userId);
        //then
        assertThat(expected).isEmpty();
    }

    @Test
    void itShouldNotFindLogByUserId() {
        //given
        ActionLog actionLog = new ActionLog(190833902020067329L, LocalTime.now() , LocalDate.now(),"userManagement", "Banned user");
        repository.save(actionLog);
        Long userId = 190833902020067329L;
        //when
        var expected = repository.findActionsByUserId(userId);
        //then
        assertThat(expected).isNotEmpty();
    }
}
