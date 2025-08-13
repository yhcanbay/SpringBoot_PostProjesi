package com.yhcanbay.sohbet_uygulamasi.service;

import java.util.List;
import java.util.Optional;

import com.yhcanbay.sohbet_uygulamasi.dto.DtoLike;

public interface ILikeService {

    List<DtoLike> getAllLikes(Optional<Long> userId,Optional<Long> postId );

    DtoLike getOneLike(Long likeId);

    DtoLike createLike(DtoLike dtoLike);

    DtoLike deleteLike(Long likeId);

}
