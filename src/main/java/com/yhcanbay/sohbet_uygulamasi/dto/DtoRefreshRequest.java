package com.yhcanbay.sohbet_uygulamasi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DtoRefreshRequest {

    private Long userId;
    private String refreshToken;

}
