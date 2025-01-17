Use Corryong
go


select * from tblQuestionType

truncate table tblQuestionType

go

insert tblQuestionType ([QuestionType]) values ('Header for question with parts, spanning all columns of table.') -- 1
insert tblQuestionType ([QuestionType]) values ('Header with borders. Typically the top of a section table') -- 2
insert tblQuestionType ([QuestionType]) values ('Question with a yes/no score. A 2 column question') -- 3
insert tblQuestionType ([QuestionType]) values ('A text area with a label, spanning all columns of the table. Label 1/9 of full width') -- 4
insert tblQuestionType ([QuestionType]) values ('Question with a comment. A 2 column question') -- 5
insert tblQuestionType ([QuestionType]) values ('Header for question with parts, spanning all columns of table') -- 6
insert tblQuestionType ([QuestionType]) values ('A text area with a label, spanning all columns of the table but left and right borders only') -- 7
insert tblQuestionType ([QuestionType]) values ('A text area with a label, spanning all columns of the table but left, right and bottom borders only') -- 8
insert tblQuestionType ([QuestionType]) values ('Question with a yes/no score. A 2 column question with top , left and right borders') -- 9
insert tblQuestionType ([QuestionType]) values ('A text area with a label, spanning all columns of the table but bottom, left and right borders only') -- 10
insert tblQuestionType ([QuestionType]) values ('Question with a yes/no score. A 2 column question with left ,right and bottom borders') -- 11
insert tblQuestionType ([QuestionType]) values ('Question with a comments and yes/no score. A 3 column question') -- 12
insert tblQuestionType ([QuestionType]) values ('A text area with a label, spanning all columns of the table. Label 1/4 of full width') -- 13
insert tblQuestionType ([QuestionType]) values ('Header with borders spanning all columns of table. Typically an extra header after the main section header but part pf the table') -- 14
insert tblQuestionType ([QuestionType]) values ('Question with a yes/no score and then a comments/details. A 3 column question') -- 15
insert tblQuestionType ([QuestionType]) values ('Question with a yes/no score and then blank for the column for details/comments. A 3 column question though') -- 16
insert tblQuestionType ([QuestionType]) values ('No question, just a single textbox for all the details') -- 17
insert tblQuestionType ([QuestionType]) values ('Question, with 3 different data points spanning full width of table') -- 18
insert tblQuestionType ([QuestionType]) values ('Question, with scale details and scale measure, score measure') -- 19
insert tblQuestionType ([QuestionType]) values ('Statement with borders. Not bold. Like a header but not bold') -- 20
insert tblQuestionType ([QuestionType]) values ('Question, with scale measure, score measure') -- 21
insert tblQuestionType ([QuestionType]) values ('Question, with commetns spanning last 2 columns or 3 column row') -- 22
insert tblQuestionType ([QuestionType]) values ('Header with borders right aligned. Typically the top of a section table') -- 23
insert tblQuestionType ([QuestionType]) values ('Question wioth scale as Y_N_DK_NA and score as a measure') -- 24
insert tblQuestionType ([QuestionType]) values ('Question spanning 2 columns and score measure') -- 25


update tblQuestionType set QuestionType = 'Question wioth scale as Y_N_DK_NA and score as a measure' where Id = 24


--update tblQuestionType set QuestionType = 'A text area with a label, spanning all columns of the table. Label 1/9 of full width' where Id = 4