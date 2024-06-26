import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        table: "Table",
        backlog: "Backlog",
        time_log: "Time Log",
        stats: "Stats",
        task_title: "Title",
        task_priority: "Priority",
        task_create_date: "Create Date",
        task_deadline: "Deadline",
        task_description: "Description",
        task_assigned: "Assigned",
        task_created: "Created",
        task_project: "Project",
        open_task_dialog: "Details",
        close_task_dialog: "Close",
        task_subtasks: "Subtasks",
        add_subtask: "Add Subtask",
        subtask_title: "Title",
        subtask_priority: "Priority",
        subtask_deadline: "Deadline",
        subtask_description: "Description",
        subtask_assigned: "Assigned",
        not_done: "Not Done",
        done: "Done",
        add_new_task: "Add New Task",
        save_task: "Save Task",
        edit_task_button: "Edit",
        task_table_add_to_kanban: "Observe",
        add_new_subtask: "Add New Subtask",
        save_subtask: "Save Subtask",
        highest_priority: "Highest",
        high_priority: "High",
        neutral_priority: "Neutral",
        low_priority: "Low",
        lowest_priority: "Lowest",
        project_id: "Project ID",
        table_task_title: "Title",
        table_task_project: "Project",
        table_task_priority: "Priority",
        table_task_deadline: "Deadline",
        table_task_assigned: "Assigned",
        table_task_description: "Description",
        table_task_options: "Options",
        task_table_add_subtask: "Add Subtask",
        task_table_edit: "Edit",
        task_table_delete: "Delete",
        kanban_to_do: "To Do",
        kanban_in_progress: "In Progress",
        kanban_verify: "Verification",
        kanban_done: "Done",
        end: "end",
        timelog_table_task: "Task name",
        timelog_table_task_status: "Status",
        timelog_table_time_start: "Start time",
        timelog_table_time_end: "Finish time",
        timelog_table_time_spend: "Time spend",
        working: "Working",
        todo: "To do",
        none: "",
        verification: "Verification",
        hours: "Hours",
        minutes: "Minutes",
        and: "and",
        task_count: "Task count",
        task_count_none: "Number of unobserved tasks",
        task_count_todo: "Number of tasks to do",
        task_count_in_progress: "Number of tasks in progress",
        task_count_verification: "Number of tasks for verification",
        task_count_done: "Number of completed tasks",
        task_count_archived: "Number of archived tasks",
        task_count_priority_lowest: "Number of tasks with lowest priority",
        task_count_priority_low: "Number of tasks with low priority",
        task_count_priority_normal: "Number of tasks with normal priority",
        task_count_priority_high: "Number of tasks with high priority",
        task_count_priority_highest: "Number of tasks with highest priority",
        fastest_time_task: "Fastest task completion time",
        slowest_time_task: "Slowest task completion time",
        average_time_task: "Average task completion time",
        project_count: "Number of projects",
        average_task_count_in_project: "Average number of tasks in a project",
        show_all_timelogs: "Show all timelogs",
        start_time_filter: "Start time filter",
        end_time_filter: "End time filter",
        filter_logs: "Filter logs",
        edit_task_dialog_title: "Edit task",
        edit_task_dialog_cancel_button: "Cancel",
        edit_task_dialog_save_button: "Save",
      },
    },
    pl: {
      translation: {
        table: "Tabela",
        backlog: "Lista zadań",
        time_log: "Dziennik czasu",
        stats: "Statystyki",
        task_title: "Tytuł",
        task_priority: "Priorytet",
        task_create_date: "Data utworzenia",
        task_deadline: "Termin zakończenia",
        task_description: "Opis",
        task_assigned: "Przypisane",
        task_created: "Utworzone",
        task_project: "Projekt",
        open_task_dialog: "Szczegóły",
        close_task_dialog: "Zamknij",
        task_subtasks: "Zadania podrzędne",
        add_subtask: "Dodaj zadanie podrzędne",
        subtask_title: "Tytuł",
        subtask_priority: "Priorytet",
        subtask_deadline: "Termin zakończenia",
        subtask_description: "Opis",
        subtask_assigned: "Przypisane",
        not_done: "Nie zrobione",
        done: "Zrobione",
        add_new_task: "Dodaj nowe zadanie",
        save_task: "Zapisz zadanie",
        edit_task_button: "Edytuj",
        task_table_add_to_kanban: "Obserwuj",
        add_new_subtask: "Dodaj nowe zadanie podrzędne",
        save_subtask: "Zapisz zadanie podrzędne",
        highest_priority: "Najwyższy",
        high_priority: "Wysoki",
        neutral_priority: "Neutralny",
        low_priority: "Niski",
        lowest_priority: "Najniższy",
        project_id: "ID projektu",
        table_task_title: "Tytuł",
        table_task_project: "Projekt",
        table_task_priority: "Priorytet",
        table_task_deadline: "Termin zakończenia",
        table_task_assigned: "Przypisane",
        table_task_description: "Opis",
        table_task_options: "Opcje",
        task_table_add_subtask: "Dodaj zadanie podrzędne",
        task_table_edit: "Edytuj",
        task_table_delete: "Usuń",
        kanban_to_do: "Do zrobienia",
        kanban_in_progress: "W trakcie",
        kanban_verify: "Weryfikacja",
        kanban_done: "Gotowe",
        end: "koniec",
        timelog_table_task: "Nazwa zadania",
        timelog_table_task_status: "Status",
        timelog_table_time_start: "Czas rozpoczęcia",
        timelog_table_time_end: "Czas zakończenia",
        timelog_table_time_spend: "Spędzony czas",
        working: "W trakcie",
        todo: "Do zrobienia",
        none: "",
        verification: "Weryfikacja",
        hours: "Godziny",
        minutes: "Minuty",
        and: "i",
        task_count: "Liczba zadań",
        task_count_none: "Liczba zadań nieobserwowanych",
        task_count_todo: "Liczba zadań do wykonania",
        task_count_in_progress: "Liczba zadań w trakcie realizacji",
        task_count_verification: "Liczba zadań do weryfikacji",
        task_count_done: "Liczba zadań zakończonych",
        task_count_archived: "Liczba zadań zarchiwizowanych",
        task_count_priority_lowest: "Liczba zadań o najniższym priorytecie",
        task_count_priority_low: "Liczba zadań o niskim priorytecie",
        task_count_priority_normal: "Liczba zadań o normalnym priorytecie",
        task_count_priority_high: "Liczba zadań o wysokim priorytecie",
        task_count_priority_highest: "Liczba zadań o najwyższym priorytecie",
        fastest_time_task: "Najszybsze zakończenie zadania",
        slowest_time_task: "Najwolfiejsze zakończenie zadania",
        average_time_task: "Średni czas zakończenia zadania",
        project_count: "Liczba projektów",
        average_task_count_in_project: "Średnia liczba zadań w projekcie",
        show_all_timelogs: "Pokaż wszystko",
        start_time_filter: "Czasu rozpoczęcia",
        end_time_filter: "Czas końca",
        filter_logs: "Filtruj dzienniki",
        edit_task_dialog_title: "Edytuj zadanie",
        edit_task_dialog_cancel_button: "Anuluj",
        edit_task_dialog_save_button: "Zapisz",
      },
    },
  },
});

export default i18n;
