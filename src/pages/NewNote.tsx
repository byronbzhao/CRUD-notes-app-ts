import React from 'react';
import NoteForm from '../components/NoteForm';
import { NoteDataType, TagType } from '../interfaces';

type NewNoteProps = {
	onSubmit: (data: NoteDataType) => void;
	onAddTag: (tag: TagType) => void;
	availableTags: TagType[];
};

const NewNote = ({ onSubmit, onAddTag, availableTags }: NewNoteProps) => {
	return (
		<div>
			<h1 className='mb-4'>New Note</h1>
			<NoteForm
				onSubmit={onSubmit}
				onAddTag={onAddTag}
				availableTags={availableTags}
			/>
		</div>
	);
};

export default NewNote;
