import type { ProjectDetail } from "./types.ts";

export const musicRecs: ProjectDetail = {
  overview: `This project explores how deep learning and classical signal processing can be combined to improve the accuracy and interpretability of music recommendation systems. Unlike traditional approaches that depend heavily on metadata or collaborative signals, this work focuses on the music itself — analyzing acoustic and temporal structure to infer listener preferences directly from sound.`,
  sections: [
    {
      title: "Motivation",
      paragraphs: [
        `Modern music recommendation systems (MRS) typically rely on collaborative filtering or
metadata-based methods (KNN, clustering, graph search) that depend on user similarity and
historical behavior rather than the music's intrinsic features. These approaches face several
challenges: cold-start for new items/users, context bias when preferences shift, and difficulty
scaling to millions of tracks with incomplete metadata. To address these problems, we propose
a content-driven neural framework grounded in the audio signal itself. By extracting
perceptually meaningful representations with DSP transforms and applying deep learning to
model spectral and temporal characteristics, the system aims to recommend music that "sounds"
like what a listener prefers, rather than just what similar users liked.`
      ]
    },
    {
      title: "Design & Architecture",
      paragraphs: [
        `The system is organized in two main stages: a DSP-driven feature extraction stage that
converts raw waveforms into structured time–frequency representations, and a modeling stage
that trains neural networks on those representations.`
      ]
    },
    {
      title: "Feature Extraction (DSP Stage)",
      bullets: [
        `Mel-Frequency Cepstral Coefficients (MFCCs): capture timbral and perceptual features`,
        `Short-Time Fourier Transform (STFT): frequency content across overlapping time windows`,
        `Discrete Wavelet Transform (DWT): multi-scale frequency analysis for transients and rhythm`
      ],
      paragraphs: [
        `These complementary transforms convert raw audio into two-dimensional arrays that encode
time and frequency behavior, providing inputs that are well-suited to convolutional
architectures.`
      ]
    },
    {
      title: "Neural Network Architecture",
      paragraphs: [
        `We evaluated both single-modal and multi-modal models. Single-modal CNNs and CNN–RNN
hybrids were trained independently on MFCC, STFT, and DWT inputs to measure each modality's
signal. For multi-modal experiments, modality-specific feature pipelines were fused and fed
into a hybrid Convolutional + LSTM network to capture local spectral patterns and long-range
temporal dependencies.`
      ],
      bullets: [
        `Single-modal: CNNs or CNN–RNN hybrids trained per representation`,
        `Multi-modal: fused MFCC + STFT + DWT streams → convolutional encoder → LSTM temporal model`,
        `Training objective: user-specific binary classification ("like" / "dislike") using
survey labels rather than global popularity`
      ]
    },
    {
      title: "Dataset & Training",
      paragraphs: [
        `A custom dataset was collected from 75 CU Boulder students. Each participant rated 50
mainstream songs (yes/no) and marked personal favorites, producing a balanced set of user
preference labels across genres. Training used dropout regularization, learning-rate tuning,
and initialization strategies focused on stability to mitigate overfitting on the small dataset.`
      ]
    },
    {
      title: "Results",
      paragraphs: [
        `Single-modal CNNs achieved 65–69% accuracy, with MFCC-based models performing best due
to their perceptual alignment with human hearing. The multi-modal CNN–RNN architectures
reached around 61–62% accuracy: fusion increased representational richness but added
training complexity and instability on this limited dataset. Simpler MFCC and DWT models
converged much faster (1–7 seconds) compared to multi-modal setups (~170 seconds), making
single-feature models more practical for large-scale deployment where efficiency matters.`
      ]
    },
    {
      title: "Key Insights & Contributions",
      bullets: [
        `Showed that acoustic-content-based recommendation is viable independent of user graphs`,
        `Designed a hybrid CNN–LSTM capable of modeling both spectral and temporal music structure`,
        `Demonstrated how classical DSP (MFCC, STFT, DWT) pairs with deep learning for interpretable audio embeddings`,
        `Highlighted trade-offs: single-feature CNNs can outperform multi-modal systems when data is limited`
      ]
    },
    {
      title: "Limitations & Ethical Considerations",
      paragraphs: [
        `Dataset constraints (75 users, mainstream-song bias) limit generalization. Large-scale
deployment must address privacy, cultural representation, and potential reinforcement of
popularity biases. Future work should broaden genres, include diverse listener demographics,
and carefully manage user data with informed consent and anonymization.`
      ],
      bullets: [
        `Limited sample size and mainstream bias may affect fairness`,
        `Cultural and privacy factors require careful handling before deployment`,
        `Model generalization could be improved by integrating lyrics, metadata, or user history`
      ]
    },
    {
      title: "Outcome & Future Work",
      paragraphs: [
        `This work demonstrates that recommendation systems can "listen" to music by combining
DSP and deep learning to model rhythm, tone, and structure. Future directions include
expanding the dataset, exploring transformer-based attention layers, and fusing audio,
lyrics, and behavioral history into an explainable, multimodal recommendation framework.`
      ]
    }
  ],
  artifacts: [
    "Poster (public/Music)",
    "Presentation (public/Music)",
    "Technical report (public/Music)",
    "Training notebooks and preprocessing scripts"
  ],
  links: [
    { label: "Poster — Deep Learning Project (Preview / Download)", href: "/Music/Deep%20Learning%20Project.pptx.png" },
    { label: "Presentation — Deep Learning Presentation (View / Download)", href: "/Music/Deep%20Learning%20Presentation.pdf" },
    { label: "Report — Music Report (View / Download)", href: "/Music/Music%20Report.pdf" },
    { label: "GitHub — NN-Music-Recommendation", href: "https://github.com/zane-perry/NN-Music-Recommendation" }
  ]
};
