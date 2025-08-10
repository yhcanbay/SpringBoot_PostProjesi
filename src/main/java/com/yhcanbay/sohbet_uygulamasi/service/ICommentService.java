package com.yhcanbay.sohbet_uygulamasi.service;

import java.util.List;
import java.util.Optional;

import com.yhcanbay.sohbet_uygulamasi.dto.DtoComment;

public interface ICommentService {

    public List<DtoComment> getAllComments(Optional<Long> userId, Optional<Long> postId);

    public DtoComment getOneComment(Long commentId);

    DtoComment createOneComment(DtoComment dtoComment);

}
