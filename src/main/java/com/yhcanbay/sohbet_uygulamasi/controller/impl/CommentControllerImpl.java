package com.yhcanbay.sohbet_uygulamasi.controller.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yhcanbay.sohbet_uygulamasi.controller.ICommentController;
import com.yhcanbay.sohbet_uygulamasi.dto.DtoComment;
import com.yhcanbay.sohbet_uygulamasi.service.ICommentService;

@RestController
@RequestMapping(path = "/comments")
public class CommentControllerImpl implements ICommentController {

    @Autowired
    ICommentService commentService;

    
    @Override
    @GetMapping
    public List<DtoComment> getAllComments(Optional<Long> userId, Optional<Long> postId) {
        return commentService.getAllComments(userId,postId);
    }

}