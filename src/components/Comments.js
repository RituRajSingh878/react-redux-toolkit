import React from 'react'
import { CommentSection} from 'react-comments-section'
import { useDispatch } from "react-redux";
import { updateTutorial} from "../slices/tutorials";
import 'react-comments-section/dist/index.css'

const DefaultComponent = (props) => {
  
    console.log(props.tutorial);
    
    const data = props.tutorial.message;
    
    const dispatch = useDispatch();
    const updateContent = () => {
        dispatch(updateTutorial({ id: props.tutorial.id, data: props.tutorial }))
          .unwrap()
          .then(response => {
            console.log(response);
            
          })
          .catch(e => {
            console.log(e);
          });
      };


  return <CommentSection
        currentUser={{
          currentUserId: (props.view==="Engineer"?"01a":"01b"),
          currentUserImg: (props.view==="Engineer"?'https://ui-avatars.com/api/name=Riya&background=random':'https://ui-avatars.com/api/name=Lily&background=random'),
          currentUserProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
          currentUserFullName: (props.view==="Engineer"?"Engineer":"Tpm")
        }}
        
        commentData={data}
        onSubmitAction={(data
        ) => console.log('check submit, ', data)}
        currentData={(data) => {
          console.log('curent data', data)
          props.tutorial.message = data
          updateContent();
        }}
        
      />
}

export default DefaultComponent