import User from '../models/userModel.js';
import Question from '../models/questionModel.js';

export const upvote = async (username, qId) => {
    const user = await User.findOne({ username });
    const ques = await Question.findOne({ qId });

    const questionId = ques._id;

    const question = user.questionsSolved.find(q => q.qId == qId);
    if (!question) {
        user.questionsSolved.push({ questionId, qId, note: "", vote: 1, timeTaken: 20 });
        ques.upvotes += 1;
    }
    else {
        switch (question.vote) {
            case 0:
                ques.upvotes += 1;
                question.vote = 1;
                break;
            case -1:
                ques.downvotes -= 1;
                ques.upvotes += 1;
                question.vote = 1;
                break;
            case 1:
                ques.upvotes -= 1;
                question.vote = 0;
                break;
        }
    }

    await ques.save();
    await user.save();

    return user;
}

export const downvote = async (username, qId) => {
    const user = await User.findOne({ username });
    const ques = await Question.findOne({ qId });


    const questionId = ques._id;

    const question = user.questionsSolved.find(q => q.qId == qId);
    if (!question) {
        user.questionsSolved.push({ questionId, qId, note: "", vote: -1, timeTaken: 20 });
        ques.downvotes += 1;
    }
    else {
        switch (question.vote) {
            case 0:
                ques.downvotes += 1;
                question.vote = -1;
                break;
            case -1:
                ques.downvotes -= 1;
                question.vote = 0;
                break;
            case 1:
                ques.upvotes -= 1;
                ques.downvotes += 1;
                question.vote = -1;
                break;
        }
    }

    await ques.save();
    await user.save();

    return user;
}

export const solved = async (username, qId) => {
    const user = await User.findOne({ username });
    const ques = await Question.findOne({ qId });


    const questionId = ques._id;

    const question = user.questionsSolved.find(q => q.qId == qId);
    if (!question) {
        user.questionsSolved.push({ questionId, qId, isSolved: true});
        ques.totalSolved += 1;
    }
    else {
        if(question.isSolved){
            ques.totalSolved -= 1;
            question.isSolved = false;
        }
        else{
            ques.totalSolved += 1;
            question.isSolved = true;
        }
    }

    await ques.save();
    await user.save();

    return user;
}

export const addNote = async (username, qId, note) => {
    const user = await User.findOne({ username });
    const ques = await Question.findOne({ qId });


    const questionId = ques._id;

    const question = user.questionsSolved.find(q => q.qId == qId);
    if (!question) {
        user.questionsSolved.push({ questionId, qId, note});
    }
    else {
        question.note = note;
    }

    await ques.save();
    await user.save();

    return user;
}

export const getVoteStatus = async (username, qId) => {
    const user = await User.findOne({ username });
    const question = user.questionsSolved.find(q => q.qId == qId);
    console.log(question.vote);
    return question.vote;
}

export const getSolvedStatus = async (username, qId) => {
    const user = await User.findOne ({ username });
    const question = user.questionsSolved.find(q => q.qId == qId);
    return question.isSolved;
}