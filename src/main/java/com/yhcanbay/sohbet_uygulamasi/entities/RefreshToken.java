package com.yhcanbay.sohbet_uygulamasi.entities;


import java.time.LocalDate;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "refresh_token")
@Data
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id" , nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)  // Ana kayıt silindiğinde ona bağlı alt kayıtlar da silinir 
    //yani user silinirse tokenlar da silinecek
    @JsonIgnore
    private User user;

    @Column(nullable = false,unique = true) // unique = true -> bu değer benzersiz olmalıdır
    private String token;

    @Column(nullable = false)
    private LocalDate expireDate;
}
