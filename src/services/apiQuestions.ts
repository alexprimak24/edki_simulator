import { Question } from '../types';
import supabase from './supabase';

export async function getQuestions(
  questionsIds: number[],
): Promise<Question[]> {
  const { data: questions, error } = await supabase
    .from('questions')
    .select('*')
    .in('id', questionsIds);

  if (error) {
    console.error(error);
    throw new Error("Questions coudn't be loaded");
  }

  return questions;
}

export async function addQuestions(questionsArr: Question[]) {
  const { data, error } = await supabase
    .from('questions')
    .insert(questionsArr)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Questions coudn't be upploaded");
  }

  return data;
}
