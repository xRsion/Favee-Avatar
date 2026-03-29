import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約 - Favee Maker",
};

export default function TermsPage() {
  return (
    <main className="flex-1 px-5 py-12 max-w-2xl mx-auto">
      <h1 className="text-2xl font-black text-foreground mb-8">利用規約</h1>

      <div className="space-y-8 text-sm text-foreground/80 leading-relaxed">
        <section>
          <h2 className="text-base font-bold text-foreground mb-3">第1条（適用）</h2>
          <p>
            本利用規約（以下「本規約」）は、株式会社（以下「当社」）が提供するFavee Maker（以下「本サービス」）の利用条件を定めるものです。ユーザーの皆様には、本規約に同意のうえ、本サービスをご利用いただきます。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground mb-3">第2条（サービス内容）</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>本サービスは、ユーザーがアップロードした写真をもとに、AIを活用してFavee風のキャラクター画像を生成するサービスです。</li>
            <li>生成される画像の品質・内容について、当社は一切の保証を行いません。</li>
            <li>本サービスは予告なく変更、中断、または終了する場合があります。</li>
          </ol>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground mb-3">第3条（ユーザーの責任）</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>ユーザーは、自身が権利を有する写真、または使用許諾を得た写真のみをアップロードしてください。</li>
            <li>第三者の肖像権、著作権、プライバシー権その他の権利を侵害する写真のアップロードは禁止します。</li>
            <li>本サービスの利用によりユーザーまたは第三者に生じた損害について、当社は一切の責任を負いません。</li>
          </ol>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground mb-3">第4条（アップロード画像の取り扱い）</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>ユーザーがアップロードした写真は、キャラクター画像の生成処理にのみ使用され、生成完了後にサーバーから速やかに削除されます。</li>
            <li>当社は、アップロードされた写真を保存、蓄積、または二次利用することはありません。</li>
            <li>ただし、画像生成にはGoogle Gemini APIを使用しており、送信されたデータはGoogleのAPIサービス利用規約に従って処理されます。</li>
          </ol>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground mb-3">第5条（生成画像の権利）</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>生成されたキャラクター画像は、ユーザーが個人的な用途で自由にご利用いただけます。</li>
            <li>生成画像の商用利用については、当社の事前の書面による許諾が必要です。</li>
            <li>生成画像にはAIによるウォーターマーク（SynthID）が含まれる場合があります。</li>
          </ol>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground mb-3">第6条（禁止事項）</h2>
          <p className="mb-2">ユーザーは、以下の行為を行ってはなりません。</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>法令または公序良俗に反する行為</li>
            <li>他者の権利を侵害する写真のアップロード</li>
            <li>本サービスの運営を妨害する行為</li>
            <li>不正アクセスまたはサーバーに過度な負荷をかける行為</li>
            <li>本サービスを利用した営利活動（当社が許可した場合を除く）</li>
            <li>わいせつ、暴力的、差別的なコンテンツの生成を目的とした利用</li>
          </ol>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground mb-3">第7条（免責事項）</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>当社は、本サービスの完全性、正確性、有用性、特定目的への適合性について、いかなる保証も行いません。</li>
            <li>本サービスの利用に起因してユーザーに生じた損害について、当社の故意または重大な過失による場合を除き、当社は一切の責任を負いません。</li>
            <li>通信環境やサーバーの障害等により、本サービスの提供が中断・遅延した場合でも、当社は責任を負いません。</li>
          </ol>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground mb-3">第8条（規約の変更）</h2>
          <p>
            当社は、必要に応じて本規約を変更することができるものとします。変更後の利用規約は、本サービス上に掲載した時点で効力を生じます。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground mb-3">第9条（準拠法・管轄裁判所）</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>本規約の解釈にあたっては、日本法を準拠法とします。</li>
            <li>本サービスに関して紛争が生じた場合には、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</li>
          </ol>
        </section>

        <section className="pt-4 border-t border-foreground/10">
          <p className="text-xs text-muted">制定日：2026年3月29日</p>
        </section>
      </div>
    </main>
  );
}
