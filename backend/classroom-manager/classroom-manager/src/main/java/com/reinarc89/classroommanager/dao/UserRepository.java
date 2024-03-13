package com.reinarc89.classroommanager.dao;

import com.reinarc89.classroommanager.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*")
public interface UserRepository extends JpaRepository<User, Long> {
}
