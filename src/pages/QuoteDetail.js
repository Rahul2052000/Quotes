import { useParams, Link,useRouteMatch } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { Route } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
const DUMMY_QUOTES = [
  { id: "q1", author: "Rahul", text: "Learning React is Fun!!" },
  { id: "q2", author: "Patel", text: "Learning React is Greate!!" },
];
const QuoteDetail = () => {
  const params = useParams();

  const {quoteId} = params

  const match = useRouteMatch();

  const {sendRequest,status,data:loadedQuotes,error} = useHttp(getSingleQuote, true);

  useEffect(()=>{
      sendRequest(quoteId)
  },[sendRequest,quoteId])

  if(status === 'pending'){
    return(
      <div className = 'centered'><LoadingSpinner/></div>
    )
  }

  if(error){
    return <p>{error}</p>;
  }

  if(!loadedQuotes.text){
    return <p>No Quote Found</p>
  }
 

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuotes.text} author={loadedQuotes.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            load Comment
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
