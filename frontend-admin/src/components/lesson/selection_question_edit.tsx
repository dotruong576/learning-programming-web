'use client';

import CancelIcon from '@mui/icons-material/Cancel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Radio, TextField, Typography } from '@mui/material';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { ESelectionAnswerChoiceList } from '~/constant/enum/lessonEnum';
import { TSelectionLessonResourse } from '~/types/api/lessonTypes';

interface SelectionQuestionProps extends TSelectionLessonResourse {
  clickDelete: () => void;
  handleUpdateResouce: (data: TSelectionLessonResourse) => void;
  id: number;
}

const SelectionQuestion: React.FC<SelectionQuestionProps> = ({
  id,
  question: _question,
  explanation: _explanation,
  answerA: _answerA,
  answerB: _answerB,
  answerC: _answerC,
  answerD: _answerD,
  correctAnswer: _correctAnswer,
  clickDelete,
  handleUpdateResouce,
}) => {
  const [correctAnswer, setCorrenctAnswer] = useState<ESelectionAnswerChoiceList>(_correctAnswer);
  const [answerA, setAnswerA] = useState<string>(_answerA);
  const [answerB, setAnswerB] = useState<string>(_answerB);
  const [answerC, setAnswerC] = useState<string>(_answerC);
  const [answerD, setAnswerD] = useState<string>(_answerD);
  const [question, setQuestion] = useState<string>(_question);
  const [explanation, setExplanation] = useState<string>(_explanation || '');

  const answerSet = [
    { index: ESelectionAnswerChoiceList.A, content: answerA, setContent: setAnswerA },
    { index: ESelectionAnswerChoiceList.B, content: answerB, setContent: setAnswerB },
    { index: ESelectionAnswerChoiceList.C, content: answerC, setContent: setAnswerC },
    { index: ESelectionAnswerChoiceList.D, content: answerD, setContent: setAnswerD },
  ];

  const triggerUpdate = _.debounce(() => {
    handleUpdateResouce({ correctAnswer, answerA, answerB, answerC, answerD, question, explanation });
  }, 1000);

  useEffect(() => {
    triggerUpdate();
  }, [correctAnswer, answerA, answerB, answerC, answerD, question, explanation]);

  return (
    <div className="rounded-2xl">
      <Accordion>
        <div className="flex items-center bg-gray-200">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className="flex-auto"
          >
            <Typography>Bài {id}</Typography>
          </AccordionSummary>
          <button onClick={clickDelete}>
            <CancelIcon className="mr-3"></CancelIcon>
          </button>
        </div>
        <AccordionDetails>
          <div className="flex-col flex space-y-4 md:pr-7 md:pl-7 md:pb-7">
            <TextField
              label="Câu hỏi"
              name="title"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              multiline
              required
            />
            <TextField
              label="Giải thích"
              name="description"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              multiline
              required
            />
            {answerSet.map((item) => (
              <div className="flex items-center" key={item.index}>
                <Radio
                  checked={correctAnswer === item.index}
                  onChange={() => setCorrenctAnswer(item.index)}
                  value={item.index}
                  name={`radio-button_${item.index}`}
                  inputProps={{ 'aria-label': item.index }}
                />
                <span className="mr-3">{item.index}.</span>
                <TextField
                  label={`Đáp án ${item.index}`}
                  name={`title_${item.index}`}
                  sx={{ width: '100%' }}
                  value={item.content}
                  onChange={(e) => item.setContent(e.target.value)}
                  required
                />
              </div>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default SelectionQuestion;
