package com.yhcanbay.sohbet_uygulamasi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DtoComment {

    private Long userId;
    private Long postId;
    private String text;
}
