package com.owendb.loggingservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.owendb.loggingservice.actionLog.ActionLog;
import com.owendb.loggingservice.actionLog.ActionLogRepository;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK, classes = ActionLog.class)
@AutoConfigureMockMvc(addFilters = false)
@TestPropertySource(locations = "classpath:application-integrationtest.properties")
@EnableAutoConfiguration
@ComponentScan(basePackages = "com.owendb.loggingservice.actionLog")
public class LogRestControllerIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ActionLogRepository repository;

    @After
    public void resetDb() { repository.deleteAll(); }

    @Test
    public void whenValidInput_thenCreateActionLog() throws Exception {
        ActionLog test = new ActionLog(190833902020067329L, LocalTime.now() , LocalDate.now(),"userManagement", "Banned user");
        System.out.println(asJsonString(test));
        mvc.perform(post("/api/log").contentType(MediaType.APPLICATION_JSON).content(asJsonString(test))).andExpect(status().isCreated());

        List<ActionLog> found = repository.findAll();
        Assert.assertTrue(found.stream().anyMatch(o -> o.getUserId().equals(190833902020067329L)));
    }

    public static String asJsonString(final Object obj) {
        try {
            final ObjectMapper mapper = new ObjectMapper();
            mapper.findAndRegisterModules();
            return mapper.writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
