import { Link } from 'react-router-dom'
import ImageWithStatus from "../../img";
import ReactHtmlParser from 'react-html-parser';


function SingleBlog({ data }) {
console.log("dddata",data)
 
    return (
        <>
            <div class="col-sm-6 col-md-6 col-lg-4">
                <div class="blog grid-blog">
                    <div class="blog-image">
                        <Link to={{
                            pathname: `/admin/blog/blog/${data.id}`,
                            state: [{id: 1, name: 'Ford', color: 'red'}]
                        }}>
                            {data.file ?
                                <ImageWithStatus class="img-fluid" url={data.file.path} /> :
                                <img class="img-fluid" src={'/assets/img/image_not_found.png'} />
                            }

                        </Link>
                    </div>
                    <div class="blog-content blog-content-description">
                        <h3 class="blog-title"> <Link to={{
                            pathname: `/admin/blog/blog/${data.id}`,
                            state: [{id: 1, name: 'Ford', color: 'red'}]
                        }}>
                        {data.blogTitle}</Link></h3>
                        <div className="ck_editor_blog">{ReactHtmlParser(data.post)}</div>
                        <div className="w-100 d-flex justify-content-between">
                            <Link to={`/admin/blog/blog/${data.id}`} class="read-more"><i class="fa fa-long-arrow-right"></i> Read More</Link>
                            <Link to={ {pathname:`/admin/blog/update/${data.id}`, aboutProps : { data : data } }} ><i class="fa fa-edit"></i></Link>
                        </div>
                        
                        <div class="blog-info clearfix">
                            <div class="post-left">
                                <ul>
                                    <li><a href="#."><i class="fa fa-calendar"></i> <span>14-04</span></a></li>
                                </ul>
                            </div>
                            <div class="post-right"><a href="#."><i class="fa fa-heart-o"></i>21</a> <a href="#."><i class="fa fa-eye"></i>8</a> <a href="#."><i class="fa fa-comment-o"></i>17</a></div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SingleBlog