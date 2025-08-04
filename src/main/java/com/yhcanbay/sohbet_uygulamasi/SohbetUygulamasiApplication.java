package com.yhcanbay.sohbet_uygulamasi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.yhcanbay")
@EntityScan(basePackages = "com.yhcanbay")
public class SohbetUygulamasiApplication {

	public static void main(String[] args) {
		SpringApplication.run(SohbetUygulamasiApplication.class, args);
	}

}
