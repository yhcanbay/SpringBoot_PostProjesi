package com.yhcanbay.sohbet_uygulamasi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DtoLike {

    Long id;
    Long userId;
    Long postId;
}
