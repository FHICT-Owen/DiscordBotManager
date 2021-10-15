package com.owendb.loggingservice.actionLog;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;

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
    private Time time;
    private Date date;
    private String category;
    private String action;

    public ActionLog() {

    }

    public ActionLog(Integer id, Long userId, Time time, Date date, String category, String action) {
        this.id = id;
        this.userId = userId;
        this.time = time;
        this.date = date;
        this.category = category;
        this.action = action;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Time getTime() {
        return time;
    }

    public void setTime(Time time) {
        this.time = time;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
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
