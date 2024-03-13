package com.reinarc89.classroommanager.controller;


import com.reinarc89.classroommanager.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("users")
public class UserController {



  @PutMapping(value = "/{id}")
  @ResponseStatus(value = HttpStatus.OK)
  public Long updateUser(User user) {
    return user.getId();
  }
}
