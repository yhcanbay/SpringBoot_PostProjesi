package com.yhcanbay.sohbet_uygulamasi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DtoComment {
    private Long id;
    private Long user_id;
    private Long post_id;
    private String text;
}
