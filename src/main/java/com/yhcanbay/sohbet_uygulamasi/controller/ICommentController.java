package com.yhcanbay.sohbet_uygulamasi.controller;

import java.util.List;
import java.util.Optional;

import com.yhcanbay.sohbet_uygulamasi.dto.DtoComment;

public interface ICommentController {

    public List<DtoComment> getAllComments(Optional<Long> userId, Optional<Long> postId);

    public DtoComment getOneComment(Long commentId);

    DtoComment createOneComment(DtoComment dtoComment);

    DtoComment updateComment(Long commentId, DtoComment dtoComment);

    DtoComment deleteComment(Long commentId);

}
