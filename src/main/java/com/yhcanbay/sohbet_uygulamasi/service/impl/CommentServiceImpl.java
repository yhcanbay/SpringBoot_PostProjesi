package com.yhcanbay.sohbet_uygulamasi.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yhcanbay.sohbet_uygulamasi.dto.DtoComment;
import com.yhcanbay.sohbet_uygulamasi.entities.Comment;
import com.yhcanbay.sohbet_uygulamasi.repository.ICommentRepository;
import com.yhcanbay.sohbet_uygulamasi.service.ICommentService;

@Service
public class CommentServiceImpl implements ICommentService{

    @Autowired
    ICommentRepository commentRepository;

    @Override
    public List<DtoComment> getAllComments(Optional<Long> userId, Optional<Long> postId) {
        
        List<Comment> commentList = commentRepository.findAll();
        List<DtoComment> dtoList = new ArrayList<>();

        for (Comment comment : commentList) {
            DtoComment dtoComment = new DtoComment();
            BeanUtils.copyProperties(comment, dtoComment);
            dtoComment.setPost_id(comment.getPost().getId());
            dtoComment.setUser_id(comment.getUser().getId());

            dtoList.add(dtoComment);
        }
        
        return dtoList;
    }

    @Override
    public DtoComment getOneComment() {
        return null;
    }

    

}
