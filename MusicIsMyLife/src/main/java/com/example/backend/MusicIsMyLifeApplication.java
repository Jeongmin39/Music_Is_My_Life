package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class MusicIsMyLifeApplication {

	public static void main(String[] args) {
		SpringApplication.run(MusicIsMyLifeApplication.class, args);
	}

}
