import Questions from '../models/questionModel.js';

export const createQuestion = async ({qId, tags, name, link, totalSolved, upvotes, downvotes, difficulty, avgTime}) => {
    const newQuestion = await Questions.create({
        qId,
        tags,
        name,
        link,
        totalSolved,
        upvotes,
        downvotes,
        difficulty,
        avgTime
    });

    if(!newQuestion){
        throw new Error("Question Not Created");
    }

    return newQuestion;
}

export const getQuestions = async (limit, skip) => {

    const totalCount = await Questions.countDocuments();
    const questions = await Questions.find().skip(skip).limit(Number(limit)).exec();

    return { questions, totalCount };
}

export const getQuestion = async (qId) => {
    const question = await Questions.findOne({qId});

    return question;
}

export const deleteQuestion = async (qId) => {
    const question = await Questions.findByIdAndDelete(qId);
    
    return question;
}

export const updateQuestion = async (qId, {tags, name, link, totalSolved, upvotes, downvotes, difficulty, avgTime}) => {
    const updatedQuestion = await Questions.findByIdAndUpdate
        (qId, {tags, name, link, totalSolved, upvotes, downvotes, difficulty, avgTime}, { new: true });

    return updatedQuestion;
}