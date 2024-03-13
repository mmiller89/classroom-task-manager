package com.reinarc89.classroommanager.entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "user")
@Data
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="Id")
  private Long Id;

  @Column(name="username")
  private String username;

  @Column(name="student_list")
  private String student_list;


}
