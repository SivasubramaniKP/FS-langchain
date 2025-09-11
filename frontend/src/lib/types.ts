export interface Message {
  id: string;
  text?: string; // Make text optional as plot messages won't have it
  sender: 'user' | 'bot';
  plotPath?: string; // Optional path for plot images
  plotDescription?: string; // Optional description for plot images
}
