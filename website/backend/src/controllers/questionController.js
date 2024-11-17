import * as questionService from "../services/questionService.js";
import Questions from '../models/questionModel.js';

export const createQuestion = async (req, res) => {
  const {
    qId,
    tags,
    name,
    link,
    totalSolved,
    upvotes,
    downvotes,
    difficulty,
    avgTime,
  } = req.body;

  try {
    const newQuestion = await questionService.createQuestion({
      qId,
      tags,
      name,
      link,
      totalSolved,
      upvotes,
      downvotes,
      difficulty,
      avgTime,
    });

    res.status(201).json({
      success: true,
      message: "Question created successfully",
      question: newQuestion,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

export const getQuestions = async (req, res) => {
  const { page = 1, limit = 3 } = req.query;
  const skip = (page - 1) * limit;
  try {
    const { questions, totalCount } = await questionService.getQuestions(
      limit,
      skip
    );

    res.status(200).json({
      success: true,
      questions,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: Number(page),
      hasMore: page < Math.ceil(totalCount / limit),
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

export const getQuestion = async (req, res) => {
  const { qId } = req.params;

  try {
    const question = await questionService.getQuestion(qId);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    res.status(200).json({
      success: true,
      question,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

export const deleteQuestion = async (req, res) => {
  const { qId } = req.params;

  try {
    const question = await questionService.deleteQuestion(qId);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

export const updateQuestion = async (req, res) => {
  const { qId } = req.params;
  const {
    tags,
    name,
    link,
    totalSolved,
    upvotes,
    downvotes,
    difficulty,
    avgTime,
  } = req.body;

  try {
    const updatedQuestion = await questionService.updateQuestion(qId, {
      tags,
      name,
      link,
      totalSolved,
      upvotes,
      downvotes,
      difficulty,
      avgTime,
    });

    if (!updatedQuestion) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Question updated successfully",
      question: updatedQuestion,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};


export const getSimilarQuestions = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Questions.find({ qId: id });
    const qname = question[0].name;
    const response = await fetch(`http://localhost:5000/api/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ qname }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch similar questions");
    }
    const responseData = await response.json();
    res.status(200).json({
      success: true,
      similarQuestions: responseData,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};
