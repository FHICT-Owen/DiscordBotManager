package com.owendb.loggingservice;

import com.owendb.loggingservice.actionLog.ActionLog;
import com.owendb.loggingservice.actionLog.ActionLogRepository;
import com.owendb.loggingservice.actionLog.ActionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class ActionLogServiceTests {
    @Mock
    private ActionLogRepository actionLogRepository;
    private ActionService actionService;

    @BeforeEach
    void setup() { actionService = new ActionService(actionLogRepository); }

    @Test
    void canGetActionLogs() {
        //when
        actionService.getLogs();
        //then
        verify(actionLogRepository).findAll();
    }

    @Test
    void canCreateActionLog() {
        //given
        ActionLog expected = new ActionLog(190833902020067329L, LocalTime.now() , LocalDate.now(),"userManagement", "Banned user");

        //when
        actionService.createLog(expected);
        ArgumentCaptor<ActionLog> actionLogArgumentCaptor =
                ArgumentCaptor.forClass(ActionLog.class);
        verify(actionLogRepository)
                .save(actionLogArgumentCaptor.capture());

        ActionLog actual = actionLogArgumentCaptor.getValue();

        //then
        assertThat(actual).isEqualTo(expected);
    }
}
