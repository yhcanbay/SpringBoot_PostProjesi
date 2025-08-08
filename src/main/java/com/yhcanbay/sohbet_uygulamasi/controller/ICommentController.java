package com.yhcanbay.sohbet_uygulamasi.controller;

import java.util.List;
import java.util.Optional;

import com.yhcanbay.sohbet_uygulamasi.dto.DtoComment;

public interface ICommentController {

    public List<DtoComment> getAllComments(Optional<Long> userId, Optional<Long> postId);

}
