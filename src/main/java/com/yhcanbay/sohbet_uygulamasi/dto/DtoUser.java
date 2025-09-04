package com.yhcanbay.sohbet_uygulamasi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DtoUser {
        
    private String userName;

    private String password;

    private int avatar_id;
}
