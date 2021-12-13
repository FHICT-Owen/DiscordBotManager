package com.owendb.loggingservice.actionLog;

import java.time.LocalDate;
import java.time.LocalTime;

public class ActionLogDto {
    public Long userId;
    public LocalTime time;
    public LocalDate date;
    public String category;
    public String action;
}
