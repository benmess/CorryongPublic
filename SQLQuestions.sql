--drop table tblQuestions

--GO


select * from tblQuestions

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Patient Details', 1, 1, 1, 1, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('^Yes=Y, No=N', 1, 1, 1, 1, 2, 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Explanation of health check given', 1, 1, 1, 1, 3, 3)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Patient consent for health check was given', 1, 1, 1, 1, 4, 3)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Consent to share/refer to other health providers', 1, 1, 1, 1, 5, 3)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Comments', 1, 1, 1, 1, 6, 4)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Previous Health Check', 1, 1, 2, 2, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('^Yes=Y, No=N', 1, 1, 2, 2, 2, 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Has the patient had a previous health check? When?', 1, 1, 2, 2, 3, 3)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Previous health check completed by (GP/Practice Name and details', 1, 1, 2, 2, 4, 3)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Background Information', 1, 1, 3, 3, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('^Comments', 1, 1, 3, 3, 2, 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('How do you think your current health is?', 1, 1, 3, 3, 3, 5)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('What is your biggest concern today?', 1, 1, 3, 3, 4, 5)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Has this stopped you from doing the things you want to do?', 1, 1, 3, 3, 5, 5)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Goals for health and wellbeing are:', 1, 1, 3, 3, 6, 6)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('1.', 1, 1, 3, 3, 7, 7)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('2.', 1, 1, 3, 3, 8, 7)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('3.', 1, 1, 3, 3, 9, 8)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Have you seen any other Doctor/GP/Specialist in the last 6 months?', 1, 1, 3, 3,10, 9)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Name and Details', 1, 1, 3, 3,11, 10)

--insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
--values ('Comments', 1, 1, 1, 1, 5, 4)


--update tblQuestions set QUestion = 'Goals for health and wellbeing are:' where ID = 16
--update tblQuestions set QuestionType = 8 where ID = 19