import { pgTable, serial, text, integer, primaryKey, uuid} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    username: text("username").notNull(),
    password: text("password").notNull(),
    name: text("name").notNull(),
})

export const students = pgTable("students", {   
    student_id: integer("student_id").primaryKey(),
    user_id: uuid("user_id").defaultRandom().references(() => users.id, {onDelete: "cascade"}),
    section: text("section").notNull(),

})

export const teachers = pgTable("teachers", {
    teacher_id: integer("teacher_id").primaryKey(),
    user_id: uuid("user_id").defaultRandom().references(() => users.id, {onDelete: "cascade"}),
})

export const sections = pgTable("sections", {
    section_id: serial("id").primaryKey(),
    name: text("name").notNull(),
})


export const subjects = pgTable("subjects", {
    subject_id: serial("id").primaryKey(),
    name: text("name").notNull(),
})

export const teacherSubjects = pgTable(
    "teacher_subjects",
    {
        teacher_id: integer("teacher_id").references(() => teachers.teacher_id).notNull(),
        subject_id: integer("subject_id").references(() => subjects.subject_id).notNull(),
    },
    (table) => [{
        pk: primaryKey({ columns: [table.teacher_id, table.subject_id] }),
    }]);
export const teacherSections = pgTable(
    "teacher_sections",
    {
        teacher_id: integer("teacher_id").references(() => teachers.teacher_id).notNull(),
        section_id: integer("section_id").references(() => sections.section_id).notNull(),
    },
    (table) => [{
        pk: primaryKey({ columns: [table.teacher_id, table.section_id] }),
    }]);

export const tests = pgTable("tests", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    teacher_id: integer("teacher_id").references(() => teachers.teacher_id, {onDelete: "cascade"}),
})

export const test_sections = pgTable("test_sections", {
    test_id: integer("test_id").references(() => tests.id, { onDelete: "cascade" }),
    section_id: integer("section_id").references(() => sections.section_id, { onDelete: "cascade" }),
}, (table) => [{
    id: primaryKey({ columns: [table.test_id, table.section_id] }) // Composite Primary Key
}]);

export const questions = pgTable("questions", {
    id: serial("id").primaryKey(),
    question: text("question").notNull(),
    test_id: integer("test_id").references(() => tests.id, {onDelete: "cascade"}),
})

export const options = pgTable("options", {
    id: serial("id").primaryKey(),
    option: text("option").notNull(),
    question_id: integer("question_id").references(() => questions.id, {onDelete: "cascade"}),
})


export const student_answers = pgTable("student_answers", {
    id: serial("id").primaryKey(),
    student_id: integer("student_id").notNull(),
    test_id: integer("test_id").notNull(),
    question_id: integer("question_id").notNull(),
    selected_option_id: integer("selected_option_id").notNull(),
    is_correct: integer("is_correct").notNull(), // 1 for correct, 0 for wrong
});
  