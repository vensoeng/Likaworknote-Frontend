export interface TaskToday {
    id: number;
    status: boolean;
    user_id: number;
    type_id: number;
    category_id: number;
    schedule: string;
    statuses_id: number;
    reminder_id: number;
    telegram_id: number;

    title: string;
    des: string;
    rate: number;

    created_at: string;
    updated_at: string;
    created: string;
    updated: string;

    type?: {
        id: number;
        title: string;
        des: string;
    };

    taskStatus?: {
        id: number;
        title: string;
        des: string;
        value: string;
    };

    reminder?: {
        id: number;
        title: string;
        des: string;
        value: string;
    };

    telegram?: {
        id: number;
        title: string;
        des: string;
        telegram_id: string;
    };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}