package com.collins.backend.models;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

@Document("todos")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Todo {
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
    @Id
    private String id;
    private Status status;
    @NotBlank
    @Size(min = 1, max = 100, message = " description too short")
    private String description;
    private String ownerId;
    private String date;

    public Date getSubmissionDateConverted(String timezone) throws ParseException {
        dateFormat.setTimeZone(TimeZone.getTimeZone(timezone));
        return dateFormat.parse(this.date);
    }

    public void setSubmissionDate(Date date) {
        dateFormat.setTimeZone(TimeZone.getDefault());
        this.date = dateFormat.format(date);
    }
}
