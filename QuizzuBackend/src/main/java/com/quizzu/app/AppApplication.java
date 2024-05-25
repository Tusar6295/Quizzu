package com.quizzu.app;

import com.quizzu.app.entity.Role;
import com.quizzu.app.entity.User;
import com.quizzu.app.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class AppApplication implements CommandLineRunner {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserRepository userRepository;
	public static void main(String[] args) {
		SpringApplication.run(AppApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		User admin = new User();
		admin.setFirstName("admin");
		admin.setPassword(passwordEncoder.encode("admin"));
		admin.setUserEmail("admin@gmail.com");
		admin.setRole(Role.ADMIN);

		User existingAdmin = userRepository.findByUserEmail("admin@gmail.com");
		if (existingAdmin == null) {
			userRepository.save(admin);
			System.out.println("Admin user created successfully.");
		} else {
			System.out.println("Admin user already exists.");
		}
	}
}
