import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Routes, Route, Navigate } from 'react-router-dom';
import NewNote from './pages/NewNote';

import { NoteDataType, RawNoteType, TagType } from './interfaces';
import { useLocalStorage } from './useLocalStorage';
import { useMemo } from 'react';
import { v4 as uuidV4 } from 'uuid';
import NoteList from './components/NoteList';
import NoteLayout from './components/NoteLayout';
import Note from './pages/Note';
import EditNote from './pages/EditNote';

function App() {
	const [notes, setNotes] = useLocalStorage<RawNoteType[]>('NOTES', []);
	const [tags, setTags] = useLocalStorage<TagType[]>('TAGS', []);

	const notesWithTags = useMemo(() => {
		return notes.map((note) => {
			return {
				...note,
				tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
			};
		});
	}, [notes, tags]);

	const onCreateNote = ({ tags, ...data }: NoteDataType) => {
		setNotes((prevNotes) => {
			return [
				...prevNotes,
				{ ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
			];
		});
	};

	const addTag = (tag: TagType) => {
		setTags((prev) => [...prev, tag]);
	};

	const onUpdateNote = (id: string, { tags, ...data}:NoteDataType) => {
		setNotes((prevNotes) => {
			return prevNotes.map(note => {
				if (note.id === id) {
					return {...note, ...data, tagIds: tags.map((tag) => tag.id)}
				} else {
					return note
				}
			})
		});
	}

	const onDeleteNote = (id: string) => {
		setNotes(prevNotes => {
			return prevNotes.filter(note => note.id !== id)
		})
	}

	const updateTag = (id:string, label:string) => {
		setTags(prevTags => {
			return prevTags.map(tag => {
				if (tag.id === id) {
					return {...tag, label}
				} else {
					return tag
				}
			})
		})
	}

	const deleteTag = (id: string) => {
		setTags(prevTags => {
			return prevTags.filter(tag => tag.id !== id)
		})
	}

	return (
		<Container className='my-4'>
			<Routes>
				<Route
					path='/'
					element={<NoteList notes={notesWithTags} availableTags={tags} onUpdateTag={updateTag} onDeleteTag={deleteTag} />}
				/>
				<Route
					path='/new'
					element={
						<NewNote
							onSubmit={onCreateNote}
							onAddTag={addTag}
							availableTags={tags}
						/>
					}
				/>
				<Route path='/:id' element={<NoteLayout notes={notesWithTags} />}>
					<Route index element={<Note onDelete={onDeleteNote} />} />
					<Route
						path='edit'
						element={
							<EditNote
								onSubmit={onUpdateNote}
								onAddTag={addTag}
								availableTags={tags}
							/>
						}
					/>
				</Route>
				<Route path='*' element={<Navigate to='/' />} />
			</Routes>
		</Container>
	);
}

export default App;
