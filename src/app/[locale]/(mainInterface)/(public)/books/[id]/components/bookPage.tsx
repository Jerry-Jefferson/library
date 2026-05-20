"use client";

import { ReviewDisplay } from "@/src/app/[locale]/(mainInterface)/(dashboard)/reviews/components/reviewDisplay/reviewDisplay";
import { ReviewForm } from "@/src/app/[locale]/(mainInterface)/(dashboard)/reviews/components/reviewForm/reviewForm";
import { QuoteDisplay } from "@/src/app/[locale]/(mainInterface)/(public)/components/quoteDisplay/quoteDisplay";
import { Button } from "@/src/components/client/button/button";
import { Collapse } from "@/src/components/client/collapse/collapse";
import { ErrorBoundary } from "@/src/components/client/errorBoundary/errorBoundary";
import ItemCard from "@/src/components/client/itemCard/itemCard";
import { ModalWindow } from "@/src/components/client/modalWindow/modalWindow";
import { ModalType, useModalQuery } from "@/src/components/client/modalWindow/useModalQuery";
import { VirtualizerList } from "@/src/components/client/virtualizerList/virtualizerList";
import LinkButton from "@/src/components/server/linkButton/linkButton";
import { IBookSerialized } from "@/src/models/book";
import { IGenreSerialized } from "@/src/models/genre";
import { IReviewSerialized } from "@/src/models/review";
import { routes } from "@/src/shared/constants/routes";
import { useFavorite } from "@/src/shared/hooks/useFavorite";
import { formatDate } from "@/src/shared/utils/formatDate";
import { Session } from "next-auth";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function BookPage({
  book,
  genres,
  reviews,
  session,
}: {
  book: IBookSerialized;
  genres: IGenreSerialized[] | null;
  reviews: IReviewSerialized[] | null;
  session: Session | null;
}) {
  const isAuthenticated = Boolean(session?.user);
  const userId = session?.user.id;
  const hasReviewed = reviews?.find((userReview) => userReview.userId === session?.user.id);
  const t = useTranslations("");
  const locale = useLocale();
  const [selectedReview, setSelectedReview] = useState<IReviewSerialized | null>(null);

  const { modal, openModal, closeModal } = useModalQuery();
  const handleOpen = (review: IReviewSerialized, modalType: ModalType) => {
    setSelectedReview(review);
    openModal(modalType);
  };

  const handleCloseModal = () => {
    setSelectedReview(null);
    closeModal();
  };

  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const backPath = from ? decodeURIComponent(from) : routes.home;

  const { isFavorite: fav, toggle } = useFavorite({
    bookId: book._id,
  });

  if (!book) return <p>{t("Books.noBook")}</p>;

  return (
    <div className="w-full flex justify-center bg-background">
      <div className="w-7/8 sm:w-4/5 gap-4 flex flex-col mt-10 mb-10">
        <ItemCard name="book">
          <div className="flex items-start gap-5 sm:gap-10 border-b border-secondary pb-12">
            <div className="w-[35%] flex flex-col gap-4 pt-4">
              <ItemCard.Avatar alt="book cover" src={book.image} view="rounded" />
              {isAuthenticated ? (
                <Button
                  fullWidth
                  size="medium"
                  variant={fav ? "secondary" : "primary"}
                  onClick={toggle}
                  className="font-bold"
                >
                  {fav ? t("Books.removeFromFavs") : t("Books.addToFavs")}
                </Button>
              ) : null}
              <LinkButton href={backPath} className="py-4">
                {t("Common.back")}
              </LinkButton>
            </div>
            <div className="w-[65%] flex flex-col gap-6">
              <div>
                <ItemCard.Title content={book.title} className="font-bold" />
                <ItemCard.Information content={book.authorName} color="primary" />
              </div>
              <ItemCard.Badge genres={genres} />
              <div className="flex flex-col gap-4">
                <h2 className="text-[clamp(12px,0.5rem+3cqw,24px)] font-bold">
                  {t("Books.synopsis")}
                </h2>
                <Collapse>
                  {({ className, toggle, isShownFull, isTruncated, textRef }) => (
                    <>
                      <ItemCard.Information
                        content={book.description}
                        color="secondary"
                        className={className}
                        ref={textRef}
                      />
                      {isTruncated && (
                        <Button
                          variant="custom"
                          onClick={toggle}
                          className="hover:text-primary-hover text-primary text-[clamp(10px,0.5rem+1vw,16px)]"
                        >
                          {isShownFull ? t("Common.collapse") : t("Common.readMore")}
                        </Button>
                      )}
                    </>
                  )}
                </Collapse>
              </div>
            </div>
          </div>
        </ItemCard>
        <div className="flex flex-col gap-4">
          <div className="w-full flex justify-between">
            <div className="flex flex-col">
              <p className="text-2xl">{t("Books.readerReviews")}</p>
              <p className="text-secondary">{t("Books.joinConversation")}</p>
            </div>
            {isAuthenticated && !hasReviewed ? (
              <Button
                variant="primary"
                size="small"
                onClick={() => openModal("review")}
                className="font-bold"
              >
                {t("Books.writeReview")}
              </Button>
            ) : null}
          </div>
          <div className="flex flex-col sm:flex-row gap-8">
            <ErrorBoundary
              title={t("Books.featuredQuote")}
              message={t("Common.mistake")}
              retryLabel={t("Common.retry")}
              failedLabel={t("Common.contentFailed")}
            >
              <QuoteDisplay quote={book.quote} />
            </ErrorBoundary>
            <div className="w-full sm:w-[60%] flex flex-col gap-4">
              {reviews && reviews.length > 0 ? (
                <VirtualizerList items={reviews}>
                  {(review) => (
                    <ErrorBoundary
                      title={t("Reviews.userReview")}
                      message={t("Common.cardWentWild")}
                      retryLabel={t("Common.retry")}
                      failedLabel={t("Common.contentFailed")}
                    >
                      <ReviewDisplay
                        review={review}
                        rating={review.rating}
                        date={formatDate(review.createdAt, locale)}
                        comment={review.comment}
                        userName={review.userName}
                        userId={userId}
                        handleOpen={(review) => handleOpen(review, "edit")}
                      />
                    </ErrorBoundary>
                  )}
                </VirtualizerList>
              ) : (
                <div className="flex items-center justify-center p-4 bg-background border border-secondary rounded-md">
                  <p className="text-secondary">{t("Books.noReviews")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {modal === "review" && !selectedReview && book && (
        <ModalWindow
          header={`${t("Reviews.reviewing")}: ${book.title}`}
          handleCancel={handleCloseModal}
        >
          <ReviewForm
            handleCancel={handleCloseModal}
            cancelButton={t("Common.cancel")}
            acceptButton={t("Books.addReview")}
            bookId={book._id}
          />
        </ModalWindow>
      )}
      {modal === "edit" && selectedReview && book && (
        <ModalWindow
          header={`${t("Books.editReview")}: ${book.title}`}
          handleCancel={handleCloseModal}
        >
          <ReviewForm
            handleCancel={handleCloseModal}
            cancelButton={t("Common.cancel")}
            acceptButton={t("Common.saveChanges")}
            bookId={book._id}
            editionData={selectedReview}
          />
        </ModalWindow>
      )}
    </div>
  );
}
