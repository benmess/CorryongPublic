--drop table tblQuestions

--GO


select * from tblQuestions


/***************** SECTION PATIENT CONSENT (1) ***********/
insert tblSection (SectionName, SectionType) values ('Patient Consent', 1)
insert tblSectionType (SectionType) values ('2 columns, question and yes/no')

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

/***************** SECTION PREVIOUS HEALTH CHECK (2) ***********/
insert tblSection (SectionName, SectionType) values ('Previous Health Check', 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Previous Health Check', 1, 1, 2, 2, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('^Yes=Y, No=N', 1, 1, 2, 2, 2, 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Has the patient had a previous health check? When?', 1, 1, 2, 2, 3, 3)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Previous health check completed by (GP/Practice Name and details', 1, 1, 2, 2, 4, 3)

/***************** SECTION BACKGROUND INFORMATION (3) ***********/
insert tblSection (SectionName, SectionType) values ('Background Information', 2)
insert tblSectionType (SectionType) values ('2 columns, question and comments')

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

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Have you been to hospital / ED in the last 12 months?', 1, 1, 3, 3,12, 11)

/***************** SECTION LEGAL ISSUES (4) ***********/
insert tblSection (SectionName, SectionType) values ('Legal Issues', 3)
insert tblSectionType (SectionType) values ('3 columns, question, comments and yes/no')

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Legal Issues', 1, 1, 4, 4, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('^Comments^Yes=Y, No=N', 1, 1, 4, 4, 2, 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Have you made any arrangements for enduring power of attorney should it become necessary?', 1, 1, 4, 4, 3, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Have you made any arrangements for guardianship should it become necessary? ', 1, 1, 4, 4, 4, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('If you were ill and unable to make decisions for yourself have you appointed a substitute decision maker or made an Advanced Care Directive?', 1, 1, 4, 4, 5, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('REFERRALS or ACTIONS REQUIRED', 1, 1, 4, 4, 6, 4)

/***************** SECTION OTHER HEALTH CARE PROVIDERS /SERVICES (5) ***********/
insert tblSection (SectionName, SectionType) values ('Other Health Care Providers /Services', 4)
insert tblSectionType (SectionType) values ('3 columns, question, yes/no and details/comments')

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Other Health Care Providers /Services', 1, 1, 5, 5, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Do you get regular health care from any of these sources?', 1, 1, 5, 5, 2, 14)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('^Yes=Y, No=N^Provider details/ contact', 1, 1, 5, 5, 3, 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Audiologist or optometrist', 1, 1, 5, 5, 4, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Community nursing', 1, 1, 5, 5, 5, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Continence adviser', 1, 1, 5, 5, 6, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Dietitian', 1, 1, 5, 5, 7, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Pharmacist', 1, 1, 5, 5, 8, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Physiotherapy', 1, 1, 5, 5, 9, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Exercise Physiologist ', 1, 1, 5, 5, 10, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Podiatry', 1, 1, 5, 5, 11, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Psychologist / counsellor', 1, 1, 5, 5, 12, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Registered nurse', 1, 1, 5, 5, 13, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Social worker', 1, 1, 5, 5, 14, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Speech pathologist', 1, 1, 5, 5, 15, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Occupational therapist', 1, 1, 5, 5, 16, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Other', 1, 1, 5, 5, 17, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Community Services^Yes=Y, No=N^Provider details/ contact', 1, 1, 5, 5, 18, 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Home Help - additional paid / unpaid', 1, 1, 5, 5, 19, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Home maintenance service', 1, 1, 5, 5, 20, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Meals on Wheels or other food provider service', 1, 1, 5, 5, 21, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Day Activity Centre', 1, 1, 5, 5, 22, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Home care services', 1, 1, 5, 5, 23, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Equipment', 1, 1, 5, 5, 24, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Home modifications', 1, 1, 5, 5, 25, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('District nurse or other nursing services', 1, 1, 5, 5, 26, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Personal care', 1, 1, 5, 5, 27, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Community care coordinator', 1, 1, 5, 5, 28, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Transport provider', 1, 1, 5, 5, 29, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Do you have ambulance cover ?', 1, 1, 5, 5, 30, 16)

/***************** SECTION MEDICAL HISTORY (Active Items) (6) ***********/
insert tblSection (SectionName, SectionType) values ('Medical History (Active Items)', 5)
insert tblSectionType (SectionType) values ('A single column of just comments')

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Medical History (Active Items)', 1, 1, 6, 6, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('', 1, 1, 6, 6, 2, 17)

select * from [dbo].[tblSection]
select * from tblSectionType

--insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
--values ('Comments', 1, 1, 1, 1, 5, 4)


--update tblQuestions set QUestion = 'Goals for health and wellbeing are:' where ID = 16
--update tblQuestions set QuestionType = 11 where ID = 22
--update tblQuestions set QuestionType = 13 where ID = 28
--update tblQuestions set QUestion = 'Legal Issues' where ID = 23