import BlogTwo from "@/components/blog/BlogTwo";
import BlogOne from "@/components/blog/BlogOne";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import Pagination from "@/components/elements/Pagination";
import Section from "@/components/elements/Section";
import Footer from "@/components/footer/Footer";
import NewsLetter from "@/components/newsletter/NewsLetter";
import CustomerService from "@/components/services/CustomerService";
import PostWidget from "@/components/widget/PostWidget";
import SearchWidget from "@/components/widget/SearchWidget";
import { getAllPosts } from "@/utils/api";

const BlogPage = ({ searchParams }) => {

    const allPosts = getAllPosts([
        'id',
        'slug',
        'postFormat',
        'videoUrl',
        'title',
        'cate',
        'featureImg',
        'gallery',
        'excerpt',
        'author_name',
        'author_img',
        'date',
        'views'
    ]);

    return (
        <>
            <main className="main-wrapper">
                <Breadcrumb activeItem="Blogs" />
                <Section>
                    <div className={`row ${searchParams.blog === "list" ? "row--25" : ""}`}>
                        <div className={`col-lg-8 ${searchParams.blog === "list" ? "axil-post-wrapper" : ""}`}>
                            {searchParams.blog === "list" ?
                                allPosts?.map((data) => (
                                    <BlogOne posts={data} key={data.id} moreBtn excerpt />
                                ))
                                :
                                <div className="row g-5">
                                    {allPosts?.map((data) => (
                                        <div className="col-md-6" key={data.id}>
                                            <BlogTwo posts={data} />
                                        </div>
                                    ))}
                                </div>
                            }
                            <Pagination
                                data={allPosts}
                                postPerPage={6}
                            />
                        </div>
                        <div className="col-lg-4">
                            <aside className="axil-sidebar-area">
                                <SearchWidget />
                                <PostWidget />
                            </aside>
                        </div>
                    </div>
                </Section>
                <NewsLetter />
                <CustomerService />
            </main>
            <Footer />
        </>
    );
}

export default BlogPage;