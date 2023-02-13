import React from 'react';
import NoteForm from '../components/NoteForm';
import { useNote } from '../helpers/helpers';
import { NoteDataType, TagType } from '../interfaces';

type EditNoteProps = {
	onSubmit: (id: string, data: NoteDataType) => void;
	onAddTag: (tag: TagType) => void;
	availableTags: TagType[];
};

const EditNote = ({ onSubmit, onAddTag, availableTags }: EditNoteProps) => {
	const note = useNote();
	return (
		<div>
			<h1 className='mb-4'>Edit Note</h1>
			<NoteForm
				title={note.title}
				markdown={note.markdown}
				tags={note.tags}
				onSubmit={(data) => onSubmit(note.id, data)}
				onAddTag={onAddTag}
				availableTags={availableTags}
			/>
		</div>
	);
};

export default EditNote;
