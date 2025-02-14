import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
})

export const students = pgTable("students", {
    student_id: integer("student_id").primaryKey(),
})

export const teachers = pgTable("teachers", {
    teacher_id: integer("teacher_id").primaryKey(),

})

export const tests = pgTable("tests", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    teacher_id: integer("teacher_id").references(() => teachers.teacher_id),
})

export const questions = pgTable("questions", {
    id: serial("id").primaryKey(),
    question: text("question").notNull(),
    test_id: integer("test_id").references(() => tests.id),
})

export const options = pgTable("options", {
    id: serial("id").primaryKey(),
    option: text("option").notNull(),
    question_id: integer("question_id").references(() => questions.id),
})


export const student_answers = pgTable("student_answers", {
    id: serial("id").primaryKey(),
    student_id: integer("student_id").notNull(),
    test_id: integer("test_id").notNull(),
    question_id: integer("question_id").notNull(),
    selected_option_id: integer("selected_option_id").notNull(),
    is_correct: integer("is_correct").notNull(), // 1 for correct, 0 for wrong
});
  