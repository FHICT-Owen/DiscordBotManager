package com.owendb.loggingservice.actionLog;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table
public class ActionLog {
    @Id
    @SequenceGenerator(
            name = "actionLog_sequence",
            sequenceName = "actionLog_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "actionLog_sequence"
    )
    private Integer id;
    private Long userId;
    private LocalTime time;
    private LocalDate date;
    private String category;
    private String action;

    public ActionLog() {

    }

    public ActionLog(Long userId, LocalTime time, LocalDate date, String category, String action) {
        this.userId = userId;
        this.time = time;
        this.date = date;
        this.category = category;
        this.action = action;
    }

    public ActionLog(ActionLog actionLog) {
        this.userId = actionLog.userId;
        this.time = actionLog.time;
        this.date = actionLog.date;
        this.category = actionLog.category;
        this.action = actionLog.action;
    }

    public Integer getId() { return id; }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }
}
