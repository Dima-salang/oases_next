CREATE TABLE "sections" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subjects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teacher_sections" (
	"teacher_id" integer NOT NULL,
	"section_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teacher_subjects" (
	"teacher_id" integer NOT NULL,
	"subject_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "test_sections" (
	"test_id" integer,
	"section_id" integer
);
--> statement-breakpoint
ALTER TABLE "options" DROP CONSTRAINT "options_question_id_questions_id_fk";
--> statement-breakpoint
ALTER TABLE "questions" DROP CONSTRAINT "questions_test_id_tests_id_fk";
--> statement-breakpoint
ALTER TABLE "tests" DROP CONSTRAINT "tests_teacher_id_teachers_teacher_id_fk";
--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "user_id" integer;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "section" text NOT NULL;--> statement-breakpoint
ALTER TABLE "teachers" ADD COLUMN "user_id" integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "username" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" text NOT NULL;--> statement-breakpoint
ALTER TABLE "teacher_sections" ADD CONSTRAINT "teacher_sections_teacher_id_teachers_teacher_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("teacher_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_sections" ADD CONSTRAINT "teacher_sections_section_id_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."sections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_subjects" ADD CONSTRAINT "teacher_subjects_teacher_id_teachers_teacher_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("teacher_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_subjects" ADD CONSTRAINT "teacher_subjects_subject_id_subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "public"."subjects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test_sections" ADD CONSTRAINT "test_sections_test_id_tests_id_fk" FOREIGN KEY ("test_id") REFERENCES "public"."tests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test_sections" ADD CONSTRAINT "test_sections_section_id_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "options" ADD CONSTRAINT "options_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_test_id_tests_id_fk" FOREIGN KEY ("test_id") REFERENCES "public"."tests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tests" ADD CONSTRAINT "tests_teacher_id_teachers_teacher_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("teacher_id") ON DELETE cascade ON UPDATE no action;